import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts';

const ProjectGrowthChart = () => {
  const data = [
    { date: 'Jan 26', count: 1 },
    { date: 'Feb 26', count: 1 },
    { date: 'Mar 26', count: 1 },
    { date: 'Apr 26', count: 2 },
    { date: 'May 26', count: 1 },
    { date: 'Jun 26', count: 1 },
  ];

  return (
    <ResponsiveContainer width="100%" height={200}>
      <BarChart data={data}>
        <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} tickMargin={8} />
        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.3)' }} tickMargin={8} width={20} />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          content={({ active, payload, label }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[#18182a]/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                  <p className="text-xs font-semibold text-white/90 mb-1">{label}</p>
                  <p className="text-xs text-indigo-300">{payload[0].value} Projects</p>
                </div>
              );
            }
            return null;
          }}
        />
        <defs>
          <linearGradient id="barGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#818cf8" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <Bar dataKey="count" fill="url(#barGrad)" radius={[6, 6, 0, 0]} barSize={36} />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default ProjectGrowthChart;