import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from 'recharts';

const CategoryBreakdownChart = () => {
  const data = [
    { category: 'Web Design', value: 2, color: '#818cf8' },
    { category: 'Web App', value: 1, color: '#34d399' },
    { category: 'Mobile App', value: 1, color: '#60a5fa' },
    { category: 'UI/UX', value: 2, color: '#c084fc' },
    { category: 'Data Viz', value: 1, color: '#fbbf24' },
  ];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie data={data} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={4} dataKey="value" nameKey="category">
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} stroke="transparent" />
          ))}
        </Pie>
        <Tooltip
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[#18182a]/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                  <p className="text-xs font-semibold text-white/90 mb-1">{payload[0].name}</p>
                  <p className="text-xs text-indigo-300">{payload[0].value} projects</p>
                </div>
              );
            }
            return null;
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CategoryBreakdownChart;