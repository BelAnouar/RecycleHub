import { Injectable, PLATFORM_ID, Inject } from "@angular/core"
import { openDB, type DBSchema, type IDBPDatabase } from "idb"
import { environment } from "../../environments/environment"
import { isPlatformBrowser } from "@angular/common"
import { WasteType } from "../models/waste-type.model"
import { RequestStatus } from "../models/request-status.model"

interface RecycleHubDB extends DBSchema {
  users: {
    key: number
    value: {
      id?: number
      name: string
      email: string
      password: string
      role: "user" | "collector"
      city?: string
      points?: number
    }
    indexes: { "by-email": string }
  }
  collections: {
    key: number
    value: {
      id?: number
      userId: number
       wasteTypes: WasteType[];
      weight: number
    status: RequestStatus;
      collectorId?: number
    }
    indexes: { "by-user": number }
  }
}

type UserWithoutId = Omit<RecycleHubDB["users"]["value"], "id">
type CollectionWithoutId = Omit<RecycleHubDB["collections"]["value"], "id">

@Injectable({
  providedIn: "root",
})
export class IndexDBService {
  private db: IDBPDatabase<RecycleHubDB> | null = null
  private isBrowser: boolean

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    if (this.isBrowser) {
      this.initDB().catch((error) => console.error("Failed to initialize IndexedDB", error));
    }
  }

  private async initDB() {
    if (!this.isBrowser) {
      return
    }
    this.db = await openDB<RecycleHubDB>(environment.indexedDBName, environment.indexedDBVersion, {
      upgrade(db) {
        const userStore = db.createObjectStore("users", { keyPath: "id", autoIncrement: true })
        userStore.createIndex("by-email", "email", { unique: true })

        const collectionStore = db.createObjectStore("collections", { keyPath: "id", autoIncrement: true })
        collectionStore.createIndex("by-user", "userId")
      },
    })
  }

  private async ensureDbConnection() {
    if (!this.isBrowser) {
      return
    }
    if (!this.db) {
      await this.initDB()
    }
  }

  async addUser(user: UserWithoutId): Promise<number> {
    await this.ensureDbConnection()
    return this.db ? this.db.add("users", user) : -1
  }

  async getUserByEmail(email: string) {
    await this.ensureDbConnection()
    return this.db ? this.db.getFromIndex("users", "by-email", email) : null
  }

  async updateUser(user: RecycleHubDB["users"]["value"]) {
    await this.ensureDbConnection()
    return this.db ? this.db.put("users", user) : false
  }

  async deleteUser(id: number) {
    await this.ensureDbConnection()
    return this.db ? this.db.delete("users", id) : false
  }

  async addCollection(collection: CollectionWithoutId): Promise<number> {
    await this.ensureDbConnection()
    return this.db ? this.db.add("collections", collection) : -1
  }

  async getCollectionsByUser(userId: number) {
    await this.ensureDbConnection()
    return this.db ? this.db.getAllFromIndex("collections", "by-user", userId) : []
  }

  async updateCollection(collection: RecycleHubDB["collections"]["value"]) {
    await this.ensureDbConnection()
    return this.db ? this.db.put("collections", collection) : false
  }

  async deleteCollection(id: number) {
    await this.ensureDbConnection()
    return this.db ? this.db.delete("collections", id) : false
  }

  async userExists(email: string): Promise<boolean> {
    await this.ensureDbConnection()
    if (!this.db) return false
    const user = await this.db.getFromIndex("users", "by-email", email)
    return !!user
  }
  async getAllCollections() {
    await this.ensureDbConnection();
    return this.db ? this.db.getAll('collections') : [];
  }

  async getUserById(id: number) {
    await this.ensureDbConnection();
    return this.db ? this.db.get('users', id) : null;
  }

}

