export default function ScreeningQuestions({
  questions = [],
  answers,
  setAnswers,
  brand,
}) {
  if (!questions.length) return null;

  const update = (i, value) => {
    const newAns = [...answers];
    newAns[i] = value;
    setAnswers(newAns);
  };

  return (
    <div className="space-y-5">
      <h3 className="font-bold text-lg">Screening Questions</h3>

      {questions.map((q, i) => (
        <div key={i}>
          <label className="text-sm block mb-2">{q}</label>

          <textarea
            className="w-full border p-3 rounded-lg"
            value={answers[i] || ""}
            onChange={(e) => update(i, e.target.value)}
          />
        </div>
      ))}
    </div>
  );
}
