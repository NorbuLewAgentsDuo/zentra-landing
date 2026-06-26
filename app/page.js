import markup from '@/components/landingMarkup';
import DesignInteractions from '@/components/DesignInteractions';

// The page body is the exact static markup from Norbu's design export
// (Zentra MY.html), rendered verbatim. All interactivity (menu, calculator,
// FAQ, scroll reveal, count-up) is attached client-side by DesignInteractions.
export default function Page() {
  return (
    <>
      <div dangerouslySetInnerHTML={{ __html: markup }} />
      <DesignInteractions />
    </>
  );
}
