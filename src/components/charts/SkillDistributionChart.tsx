import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from 'recharts';

const SkillDistributionChart = () => {
  const skillData = [
    { skill: 'React', level: 5, fill: '#818cf8' },
    { skill: 'TypeScript', level: 4, fill: '#60a5fa' },
    { skill: 'Tailwind', level: 4, fill: '#22d3ee' },
    { skill: 'Motion', level: 3, fill: '#c084fc' },
    { skill: 'React Native', level: 2, fill: '#a78bfa' },
    { skill: 'UI/UX', level: 5, fill: '#f472b6' },
  ];

  return (
    <ResponsiveContainer width="100%" height={180}>
      <BarChart data={skillData} layout="vertical">
        <XAxis type="number" domain={[0, 5]} axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: 'rgba(255,255,255,0.25)' }} />
        <YAxis dataKey="skill" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'rgba(255,255,255,0.5)' }} width={75} />
        <Tooltip
          cursor={{ fill: 'rgba(255,255,255,0.03)' }}
          content={({ active, payload }) => {
            if (active && payload && payload.length) {
              return (
                <div className="bg-[#18182a]/95 backdrop-blur-xl border border-white/10 rounded-xl px-4 py-3 shadow-2xl">
                  <p className="text-xs font-semibold text-white/90 mb-1">{payload[0]?.payload?.skill || payload[0]?.name}</p>
                  <p className="text-xs text-indigo-300">Level: {payload[0]?.value}/5</p>
                </div>
              );
            }
            return null;
          }}
        />
        <Bar dataKey="level" radius={[0, 6, 6, 0]} maxBarSize={20}>
          {skillData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.fill} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default SkillDistributionChart;