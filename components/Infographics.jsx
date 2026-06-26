'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SpeedToLeadChart from '@/components/charts/SpeedToLeadChart';
import KpiBand from '@/components/charts/KpiBand';
import BeforeAfterBars from '@/components/charts/BeforeAfterBars';
import SystemFlywheel from '@/components/charts/SystemFlywheel';
import LeadLeakLiveChart from '@/components/charts/LeadLeakLiveChart';

// Mounts animated chart sections into balanced placeholder <div>s that
// page.js injects between the static design's sections (see enhance()).
// Portals avoid splitting the one-piece design markup, which would break it.
const MOUNTS = [
  { id: 'z-kpi-mount', Chart: KpiBand },
  { id: 'z-speed-mount', Chart: SpeedToLeadChart },
  { id: 'z-beforeafter-mount', Chart: BeforeAfterBars },
  { id: 'z-flywheel-mount', Chart: SystemFlywheel },
  { id: 'z-leak-mount', Chart: LeadLeakLiveChart },
];

export default function Infographics() {
  const [nodes, setNodes] = useState({});

  useEffect(() => {
    const found = {};
    for (const { id } of MOUNTS) {
      const el = document.getElementById(id);
      if (el) found[id] = el;
    }
    setNodes(found);
  }, []);

  return (
    <>
      {MOUNTS.map(({ id, Chart }) =>
        nodes[id] ? createPortal(<Chart key={id} />, nodes[id]) : null
      )}
    </>
  );
}
