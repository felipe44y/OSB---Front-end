import "./HoursSummary.css";

export default function HoursSummary() {
  const categories = [
    { name: "Ensino", approved: 60, limit: 120, submitted: 90, pending: 60 },
    { name: "Pesquisa", approved: 20, limit: 60, submitted: 40, pending: 20 },
    { name: "Extensão", approved: 0, limit: 60, submitted: 40, pending: 60 },
  ];

  return (
    <div className="summary-card">
      <h2 className="title">Resumo de Horas</h2>
      <p className="subtitle">
        Acompanhe seu progresso nas atividades complementares
      </p>
      <div className="category-row">
        {categories.map((cat) => (
          <div key={cat.name} className="category">
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <p style={{ fontSize: "1.2rem" }}>{cat.name}</p>
              <section>
                {cat.approved}/{cat.limit}h
              </section>
            </div>
            <div className="progress-bar">
              <div
                className="progress"
                style={{ width: `${(cat.approved / cat.limit) * 100}%` }}
              ></div>
            </div>
            <div className="details">
              <section
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <p>Submetidas: {cat.submitted}h</p>
                <p>Deferidas: {cat.approved}h</p>
              </section>
              <section
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <p>Pendentes: {cat.pending}h</p>
                <p>Limite: {cat.limit}h</p>
              </section>
            </div>
          </div>
        ))}
      </div>
      <button className="button">Integralizar Creditações</button>
    </div>
  );
}
