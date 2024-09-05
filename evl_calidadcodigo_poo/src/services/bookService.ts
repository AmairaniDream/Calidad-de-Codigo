import pool from "../database/database"; // Importa la conexión a la base de datos desde database.ts
import { Book } from "../models/book";

export class BookService {
  // Obtiene todos los libros desde la base de datos
  async getAllBooks(): Promise<Book[]> {
    const result = await pool.query('SELECT * FROM books');
    return result.rows.map(row => new Book(row.id, row.name));
  }

  // Obtiene un libro por su ID desde la base de datos
  async getBookById(id: number): Promise<Book | undefined> {
    const result = await pool.query('SELECT * FROM books WHERE id = $1', [id]);
    if (result.rows.length > 0) {
      const row = result.rows[0];
      return new Book(row.id, row.name);
    }
    return undefined;
  }

  // Crea un nuevo libro en la base de datos
  async createBook(book: Book): Promise<Book> {
    const result = await pool.query(
      'INSERT INTO books (name) VALUES ($1) RETURNING id',
      [book.name]
    );
    const newId = result.rows[0].id;
    return new Book(newId, book.name);
  }

  // Actualiza un libro en la base de datos
  async updateBook(id: number, updatedBook: Book): Promise<Book | undefined> {
    const result = await pool.query(
      'UPDATE books SET name = $1 WHERE id = $2 RETURNING id',
      [updatedBook.name, id]
    );
    if (result.rows.length > 0) {
      return updatedBook;
    }
    return undefined;
  }

  // Elimina un libro de la base de datos
  async deleteBook(id: number): Promise<boolean> {
    const result = await pool.query('DELETE FROM books WHERE id = $1', [id]);
    return result?.rowCount != null && result.rowCount > 0;
  }
}
