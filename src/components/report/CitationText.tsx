import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { REFERENCES } from '../../data/latestReportData';

interface CitationTextProps {
  text: string;
  className?: string;
}

const CITATION_PATTERN = /(\[(?:\d+(?:\s*[-,–]\s*\d+)*)\]|\[@[^\]]+\])/g;
const REFERENCE_BY_NUMBER = new Map(REFERENCES.map((reference) => [reference.number, reference]));
const REFERENCE_BY_KEY = new Map(
  REFERENCES.filter((reference) => reference.key).map((reference) => [reference.key, reference]),
);

function CitationLink({
  label,
  number,
  citationKey,
}: {
  label: string;
  number?: number;
  citationKey?: string;
}) {
  const reference = number
    ? REFERENCE_BY_NUMBER.get(number)
    : citationKey
      ? REFERENCE_BY_KEY.get(citationKey)
      : undefined;
  const className =
    'mx-0.5 whitespace-nowrap font-semibold text-blue-600 underline decoration-blue-200 underline-offset-2 hover:text-blue-800';

  if (reference?.url) {
    return (
      <a
        href={reference.url}
        target="_blank"
        rel="noreferrer"
        title={`打开参考文献 ${reference.number}`}
        className={className}
      >
        {label}
      </a>
    );
  }

  const to = reference
    ? `/references#ref-${reference.number}`
    : citationKey
      ? `/references?key=${encodeURIComponent(citationKey)}`
      : `/references#ref-${number}`;
  return <Link to={to} className={className}>{label}</Link>;
}

export default function CitationText({ text, className }: CitationTextProps) {
  const parts = text.split(CITATION_PATTERN);

  return (
    <span className={className}>
      {parts.map((part, index) => {
        const numeric = part.match(/^\[(\d+)/);
        if (numeric) {
          return (
            <CitationLink key={`${part}-${index}`} label={part} number={Number(numeric[1])} />
          );
        }

        const keyed = part.match(/^\[@(.+)\]$/);
        if (keyed) {
          const reference = REFERENCE_BY_KEY.get(keyed[1]);
          return (
            <CitationLink
              key={`${part}-${index}`}
              label={reference ? `[${reference.number}]` : '[来源]'}
              citationKey={keyed[1]}
            />
          );
        }

        return <Fragment key={`${index}-${part.slice(0, 8)}`}>{part}</Fragment>;
      })}
    </span>
  );
}
