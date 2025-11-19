'use client';

import { Github, Linkedin, Mail, Phone, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeProvider';
import type { PortfolioData } from '@/lib/portfolio-data';

type HeaderProps = {
  data: PortfolioData;
};

export default function Header({ data }: HeaderProps) {
  const socialLinks = [
    {
      href: `mailto:${data.email}`,
      icon: <Mail className="h-4 w-4" />,
      label: 'Email',
    },
    {
      href: `tel:${data.phone}`,
      icon: <Phone className="h-4 w-4" />,
      label: 'Phone',
    },
    {
      href: `https://github.com/${data.github}`,
      icon: <Github className="h-4 w-4" />,
      label: 'GitHub',
    },
    {
      href: `https://linkedin.com/in/${data.linkedin}`,
      icon: <Linkedin className="h-4 w-4" />,
      label: 'LinkedIn',
    },
    {
      href: `https://leetcode.com/${data.leetcode}`,
      icon: <Code className="h-4 w-4" />,
      label: 'LeetCode',
    },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <a className="mr-6 flex items-center space-x-2" href="/">
            <span className="hidden font-bold sm:inline-block font-headline">
              {data.name}
            </span>
          </a>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <a href="#about" className="transition-colors hover:text-primary">About</a>
            <a href="#experience" className="transition-colors hover:text-primary">Experience</a>
            <a href="#projects" className="transition-colors hover:text-primary">Projects</a>
            <a href="#skills" className="transition-colors hover:text-primary">Skills</a>
            <a href="#education" className="transition-colors hover:text-primary">Education</a>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="flex items-center space-x-2">
            {socialLinks.map((link) => (
              <Button key={link.label} variant="ghost" size="icon" asChild>
                <a href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.label}>
                  {link.icon}
                </a>
              </Button>
            ))}
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
