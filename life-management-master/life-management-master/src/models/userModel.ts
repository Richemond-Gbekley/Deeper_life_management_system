import pool from '../config/db';

export interface User {
  id?: number;
  full_name: string; // updated to match DB column
  location: string;
  password: string;
  created_at?: Date;
}

export class UserModel {
  // Create a new member
  static async create(user: User): Promise<User> {
    const [result] = await pool.execute(
      'INSERT INTO members (full_name, location, password) VALUES (?, ?, ?)',
      [user.full_name, user.location, user.password]
    );
    const insertedId = (result as any).insertId;
    return { ...user, id: insertedId };
  }

  // Find member by full_name and location (for login)
  static async findByFullNameAndLocation(full_name: string, location: string): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT * FROM members WHERE full_name = ? AND location = ?',
      [full_name, location]
    );
    const users = Array.isArray(rows) ? (rows as User[]) : [];
    return users[0] ?? null;
  }

  // Find member by ID
  static async findById(id: number): Promise<User | null> {
    const [rows] = await pool.execute(
      'SELECT id, full_name, location, created_at FROM members WHERE id = ?',
      [id]
    );
    const users = Array.isArray(rows) ? (rows as User[]) : [];
    return users[0] ?? null;
  }

  // Fetch all unique locations (for dropdown)
static async getLocations(): Promise<string[]> {
  try {
    const [rows] = await pool.execute(
      'SELECT DISTINCT location FROM members'
    );
    console.log('DB rows for locations:', rows); // <-- Log the raw result
    return Array.isArray(rows) ? (rows as any[]).map(r => r.location) : [];
  } catch (err) {
    console.error('DB error in getLocations:', err); // <-- Log DB errors
    throw err;
  }
}


}
