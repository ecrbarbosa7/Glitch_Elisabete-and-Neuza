import Movie from "../models/movie.model.js";

export async function getMovies(req, res) {
  try {
    const movies = await Movie.find({ genre: "Sci-Fi" });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar filmes" });
  }
}

export async function createMovie(req, res) {
  try {
    const movie = await Movie.create(req.body);
    res.status(201).json(movie);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({
      message: "Erro ao criar filme",
      error: error.message
    });
  }
}

export async function updateMovie(req, res) {
  try {
    const movie = await Movie.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json(movie);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar filme" });
  }
}

export async function deleteMovie(req, res) {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    res.json({ message: "Filme apagado com sucesso" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao apagar filme" });
  }
}