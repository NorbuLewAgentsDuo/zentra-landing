'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import SpeedToLeadChart from '@/components/charts/SpeedToLeadChart';

// Mounts animated chart sections into balanced placeholder <div>s that
// page.js injects between the static design's sections (see enhance()).
// Portals avoid splitting the one-piece design markup, which would break it.
const MOUNTS = [{ id: 'z-speed-mount', Chart: SpeedToLeadChart }];

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
