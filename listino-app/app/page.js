import content from '@/lib/content.json';
import Listino from '@/components/Listino';

export default function Page() {
  return <Listino content={content} />;
}
