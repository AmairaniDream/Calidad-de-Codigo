import { Request, Response } from "express";
import { BookService } from "../services/bookService";
import { Book } from "../models/book";

export class BookController {
  private bookService: BookService;

  constructor() {
    this.bookService = new BookService();
  }

  // Se obtiene los libros
  getAll = async (req: Request, res: Response) => {
    try {
      const books = await this.bookService.getAllBooks();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json({ error: "Error fetching books" });
    }
  };

  // Obtiene un libro por ID
  getById = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const book = await this.bookService.getBookById(id);
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: "Libro no existente" });
      }

    } catch (error) {
      res.status(500).json({ error: "No se pudo obtener el libro" });
    }
  };

  // genera un nuevo libro
  create = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      const newBook = new Book(0, name);
      const createdBook = await this.bookService.createBook(newBook);
      res.status(201).json(createdBook);
    } catch (error) {
      res.status(500).json({ error: "Problema al generar el libro" });
    }
  };

  // modifica el libro existent
  update = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id);
      const { name } = req.body; 
  
      const bookToUpdate = new Book(id, name); 
      const updatedRecord = await this.bookService.updateBook(id, bookToUpdate); 
  
      if (updatedRecord) {
        res.status(200).json(updatedRecord); 
      } else {
        res.status(404).json({ message: "No se encontró el libro" }); // Error 404 si no se encuentra
      }
    } catch (err) {
      res.status(500).json({ message: "Ocurrió un error al actualizar el libro" }); // Error 500 para excepciones
    }
  };


  //  se elimina un libro si existe
  delete = async (req: Request, res: Response): Promise<void> => {
    try {
      const id = Number(req.params.id); 
      const wasDeleted = await this.bookService.deleteBook(id); 
  
      if (wasDeleted) {
        res.status(204).end(); 
      } else
      {
        res.status(404).json({ message: "Libro no encontrado" }); // Respuesta de error si no se encuentra
      }
    } catch (err) {
      res.status(500).json({ message: "Ocurrió un error al eliminar el libro" }); // Manejo de errores de servidor
    }
  };

}