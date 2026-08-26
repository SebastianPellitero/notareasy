'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/', label: 'Poder Especial' },
  { href: '/photo-handoff', label: 'Captura por celular (demo)' },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-neutral-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center gap-6 px-4 py-3 md:px-8">
        <span className="font-semibold text-neutral-900">notareasy</span>
        <ul className="flex gap-4 text-sm">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={
                  pathname === link.href
                    ? 'font-medium text-neutral-900 underline underline-offset-4'
                    : 'text-neutral-500 hover:text-neutral-900'
                }
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
