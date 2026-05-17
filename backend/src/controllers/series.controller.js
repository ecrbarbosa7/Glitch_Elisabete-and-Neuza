import Series from "../models/series.model.js";

export async function getSeries(req, res) {
  try {
    const series = await Series.find({});
    res.json(series);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar séries" });
  }
}

export async function createSerie(req, res) {
  try {
    const serie = await Series.create(req.body);
    res.status(201).json(serie);
  } catch (error) {
    res.status(400).json({
      message: "Erro ao criar série",
      error: error.message
    });
  }
}

export async function updateSerie(req, res) {
  try {
    const serie = await Series.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.json(serie);
  } catch (error) {
    res.status(400).json({ message: "Erro ao atualizar série" });
  }
}

export async function deleteSerie(req, res) {
  try {
    await Series.findByIdAndDelete(req.params.id);
    res.json({ message: "Série apagada com sucesso" });
  } catch (error) {
    res.status(400).json({ message: "Erro ao apagar série" });
  }
}