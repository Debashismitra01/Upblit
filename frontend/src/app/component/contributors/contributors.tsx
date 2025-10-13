import React, { useEffect, useState } from 'react';

interface Contributor {
  id: number;
  login: string;
  avatar_url: string;
  html_url: string;
  contributions: number;
}

interface ContributorsProps {
 type?: 'large' | 'default' | 'list';
}

export default function Contributors({ type = 'default' }: ContributorsProps) {
  const owner = "Debashismitra01";
  const repo = "Upblit";

  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchContributors() {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/contributors`);
        if (!res.ok) throw new Error('Failed to fetch contributors');
        const data: Contributor[] = await res.json();
        setContributors(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
    fetchContributors();
  }, []);

  if (loading) return <p className="text-gray-400 text-center py-6 italic">Loading contributors...</p>;
  if (error) return <p className="text-red-500 text-center py-6 italic">Error: {error}</p>;
  if (contributors.length === 0) return <p className="text-gray-400 text-center py-6 italic">No contributors found.</p>;

  // Shared styles for fonts and colors
  const baseFontCubano = { fontFamily: 'var(--font-cubano, "Arial Black", sans-serif)', fontWeight: 400 };
  const baseFontMontserrat = { fontFamily: 'var(--font-montserrat, "Helvetica", sans-serif)' };
  const baseFontJetbrains = { fontFamily: 'var(--font-jetbrains, "Monaco", monospace)' };

  if (type === 'list') {
    // List style: vertical list, avatar + name + contributions in a row
    return (
      <section className="max-w-3xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-gray-100 text-center" style={baseFontCubano}>
          Contributors
        </h2>
        <ul className="divide-y divide-gray-700">
          {contributors.map((contributor) => (
            <li
              key={contributor.id}
              className="flex items-center gap-4 py-4 hover:bg-gray-800 rounded-lg transition-colors cursor-pointer"
              onClick={() => window.open(contributor.html_url, '_blank')}
              title={`${contributor.login} — ${contributor.contributions} contributions`}
            >
              <img
                src={contributor.avatar_url}
                alt={contributor.login}
                className="w-12 h-12 rounded-full border-2 border-cyan-400 object-cover"
                loading="lazy"
              />
              <div className="flex-1 min-w-0">
                <p className="text-gray-100 font-semibold truncate" style={baseFontMontserrat}>
                  {contributor.login}
                </p>
                <p className="text-gray-400 text-sm" style={baseFontJetbrains}>
                  ⭐ {contributor.contributions} contributions
                </p>
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-cyan-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  const isCompact = type === 'default';

  return (
    <section className="max-w-4xl mx-auto px-6 py-12">
      <h2 className="text-3xl font-bold mb-8 text-gray-100 text-center" style={baseFontCubano}>
        Contributors
      </h2>
      <div
        className={`grid gap-6 ${
          isCompact ? 'grid-cols-3 sm:grid-cols-4 md:grid-cols-5' : 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
        }`}
      >
        {contributors.map((contributor) => (
          <a
            key={contributor.id}
            href={contributor.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`bg-gray-900 border rounded-2xl p-4 flex flex-col items-center text-center text-gray-100 transition-transform duration-200 hover:scale-105 hover:border-cyan-400 shadow-sm ${
              isCompact ? 'border-gray-700 p-2' : 'border-gray-700 p-4'
            }`}
            title={`${contributor.login} — ${contributor.contributions} contributions`}
          >
            <img
              src={contributor.avatar_url}
              alt={contributor.login}
              className={`rounded-full border-2 border-cyan-400 mb-3 object-cover ${
                isCompact ? 'w-12 h-12' : 'w-20 h-20'
              }`}
              loading="lazy"
            />
            <p
              className={`truncate max-w-full ${
                isCompact ? 'text-sm font-semibold' : 'font-semibold'
              }`}
              style={baseFontMontserrat}
            >
              {contributor.login}
            </p>
            <p
              className={`text-gray-400 mt-1 ${
                isCompact ? 'text-xs' : 'text-sm'
              }`}
              style={baseFontJetbrains}
            >
              ⭐ {contributor.contributions}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
