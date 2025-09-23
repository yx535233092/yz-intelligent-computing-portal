import React from 'react';

import ServiceIntro from './ServiceIntro';
import TextCollection from './TextCollection';
import CollectionFlow from './CollectionFlow';
import Advantages from './Advantages';

export default function DataGetPage() {
  return (
    <div className="min-h-screen bg-[#fafbfc] pb-20">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 lg:px-10 pt-16">
        <ServiceIntro />
        <TextCollection />
        <CollectionFlow />
        <Advantages />
      </div>
    </div>
  );
}
