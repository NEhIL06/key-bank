import { getDatabase } from "./mongodb"
import { encrypt, decrypt, type EncryptedData } from "./encryption"
import type { ObjectId } from "mongodb"

export interface Customer {
  _id?: ObjectId
  appwriteUserId: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
  preferences: {
    notifications: boolean
    theme: "dark" | "light"
  }
}

export interface Project {
  _id?: ObjectId
  customerId: ObjectId
  name: string
  description?: string
  createdAt: Date
  updatedAt: Date
}

export interface ApiKey {
  _id?: ObjectId
  projectId: ObjectId
  customerId: ObjectId
  name: string
  service: string
  environment: "development" | "staging" | "production"
  encryptedValue: EncryptedData
  keyHash: string // For searching without decrypting
  notes?: string
  rotationReminder?: "30" | "60" | "90" | "180" | "none"
  lastRotated?: Date
  createdAt: Date
  updatedAt: Date
}

export class DatabaseService {
  private async getDb() {
    return await getDatabase()
  }

  // Customer operations
  async createCustomer(appwriteUserId: string, email: string, name: string): Promise<Customer> {
    const db = await this.getDb()
    const customer: Omit<Customer, "_id"> = {
      appwriteUserId,
      email,
      name,
      createdAt: new Date(),
      updatedAt: new Date(),
      preferences: {
        notifications: true,
        theme: "dark",
      },
    }

    const result = await db.collection<Customer>("customers").insertOne(customer)
    return { ...customer, _id: result.insertedId }
  }

  async getCustomerByAppwriteId(appwriteUserId: string): Promise<Customer | null> {
    const db = await this.getDb()
    return await db.collection<Customer>("customers").findOne({ appwriteUserId })
  }

  async updateCustomer(customerId: ObjectId, updates: Partial<Customer>): Promise<Customer | null> {
    const db = await this.getDb()
    const result = await db
      .collection<Customer>("customers")
      .findOneAndUpdate(
        { _id: customerId },
        { $set: { ...updates, updatedAt: new Date() } },
        { returnDocument: "after" },
      )
    return result.value
  }

  // Project operations
  async createProject(customerId: ObjectId, name: string, description?: string): Promise<Project> {
    const db = await this.getDb()
    const project: Omit<Project, "_id"> = {
      customerId,
      name,
      description,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<Project>("projects").insertOne(project)
    return { ...project, _id: result.insertedId }
  }

  async getProjectsByCustomerId(customerId: ObjectId): Promise<Project[]> {
    const db = await this.getDb()
    return await db.collection<Project>("projects").find({ customerId }).sort({ createdAt: -1 }).toArray()
  }

  async getProjectById(projectId: ObjectId): Promise<Project | null> {
    const db = await this.getDb()
    return await db.collection<Project>("projects").findOne({ _id: projectId })
  }

  async updateProject(projectId: ObjectId, updates: Partial<Project>): Promise<Project | null> {
    const db = await this.getDb()
    const result = await db
      .collection<Project>("projects")
      .findOneAndUpdate(
        { _id: projectId },
        { $set: { ...updates, updatedAt: new Date() } },
        { returnDocument: "after" },
      )
    return result.value
  }

  async deleteProject(projectId: ObjectId): Promise<boolean> {
    const db = await this.getDb()
    // First delete all API keys in this project
    await db.collection<ApiKey>("apikeys").deleteMany({ projectId })
    // Then delete the project
    const result = await db.collection<Project>("projects").deleteOne({ _id: projectId })
    return result.deletedCount > 0
  }

  // API Key operations
  async createApiKey(
    projectId: ObjectId,
    customerId: ObjectId,
    keyData: {
      name: string
      service: string
      environment: "development" | "staging" | "production"
      keyValue: string
      notes?: string
      rotationReminder?: "30" | "60" | "90" | "180" | "none"
    },
  ): Promise<ApiKey> {
    const db = await this.getDb()
    const encryptedValue = encrypt(keyData.keyValue)

    const apiKey: Omit<ApiKey, "_id"> = {
      projectId,
      customerId,
      name: keyData.name,
      service: keyData.service,
      environment: keyData.environment,
      encryptedValue,
      keyHash: crypto.createHash("sha256").update(keyData.keyValue).digest("hex"),
      notes: keyData.notes,
      rotationReminder: keyData.rotationReminder || "none",
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    const result = await db.collection<ApiKey>("apikeys").insertOne(apiKey)
    return { ...apiKey, _id: result.insertedId }
  }

  async getApiKeysByProjectId(projectId: ObjectId): Promise<ApiKey[]> {
    const db = await this.getDb()
    return await db.collection<ApiKey>("apikeys").find({ projectId }).sort({ createdAt: -1 }).toArray()
  }

  async getApiKeyById(keyId: ObjectId): Promise<ApiKey | null> {
    const db = await this.getDb()
    return await db.collection<ApiKey>("apikeys").findOne({ _id: keyId })
  }

  async updateApiKey(keyId: ObjectId, updates: Partial<ApiKey>): Promise<ApiKey | null> {
    const db = await this.getDb()

    // If updating the key value, encrypt it
    if (updates.encryptedValue && typeof updates.encryptedValue === "string") {
      updates.encryptedValue = encrypt(updates.encryptedValue as any)
    }

    const result = await db
      .collection<ApiKey>("apikeys")
      .findOneAndUpdate({ _id: keyId }, { $set: { ...updates, updatedAt: new Date() } }, { returnDocument: "after" })
    return result.value
  }

  async deleteApiKey(keyId: ObjectId): Promise<boolean> {
    const db = await this.getDb()
    const result = await db.collection<ApiKey>("apikeys").deleteOne({ _id: keyId })
    return result.deletedCount > 0
  }

  // Utility method to decrypt API key value
  decryptApiKeyValue(apiKey: ApiKey): string {
    return decrypt(apiKey.encryptedValue)
  }

  // Get project with key count
  async getProjectsWithKeyCounts(customerId: ObjectId): Promise<Array<Project & { keyCount: number }>> {
    const db = await this.getDb()
    const pipeline = [
      { $match: { customerId } },
      {
        $lookup: {
          from: "apikeys",
          localField: "_id",
          foreignField: "projectId",
          as: "keys",
        },
      },
      {
        $addFields: {
          keyCount: { $size: "$keys" },
        },
      },
      {
        $project: {
          keys: 0, // Remove the keys array from the result
        },
      },
      { $sort: { createdAt: -1 } },
    ]

    return (await db.collection<Project>("projects").aggregate(pipeline).toArray()) as Array<
      Project & { keyCount: number }
    >
  }
}

export const databaseService = new DatabaseService()
