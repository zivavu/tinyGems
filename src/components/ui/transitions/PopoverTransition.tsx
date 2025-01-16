'use client';

import { Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface PopoverTransitionProps {
  show: boolean;
  children: React.ReactNode;
}

export function PopoverTransition({ show, children }: PopoverTransitionProps) {
  return (
    <Transition
      show={show}
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="opacity-0 translate-y-1 scale-95"
      enterTo="opacity-100 translate-y-0 scale-100"
      leave="transition ease-in duration-50"
      leaveFrom="opacity-100 translate-y-0 scale-100"
      leaveTo="opacity-0 translate-y-1 scale-95"
    >
      {children}
    </Transition>
  );
}
