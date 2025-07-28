import { redirect } from 'next/navigation';

export default function CollaboratorsRootPage() {
  redirect('/collaborators/pending');
  return null;
} 