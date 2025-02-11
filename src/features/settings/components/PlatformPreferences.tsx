'use client';

import { PlatformType } from '@/features/gems/types';
import { platformIconsMap } from '@/features/gems/utils/platformIconsMap';
import { Icons } from '@/features/shared/components/Icons';
import { Typography } from '@/features/shared/components/Typography';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

interface Platform {
  id: PlatformType;
  name: string;
}

interface PlatformPreferencesProps {
  platforms: Platform[];
}

interface SortablePlatformProps {
  platform: Platform;
}

function PlatformItem({ platform, index }: { platform: Platform; index: number }) {
  return (
    <div
      className="flex items-center gap-3 rounded-lg border border-amber-100 bg-white p-3 
      dark:border-amber-900 dark:bg-gray-800"
    >
      <div className="flex items-center gap-3 flex-1">
        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-800">
          <Typography variant="small">{index + 1}</Typography>
        </div>
        <FontAwesomeIcon icon={platformIconsMap[platform.id]} className="h-5 w-5" />
        <Typography variant="small">{platform.name}</Typography>
      </div>
      <Icons.GripVertical className="h-4 w-4 text-gray-400" />
    </div>
  );
}

function SortablePlatform({ platform, index }: SortablePlatformProps & { index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: platform.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`${isDragging ? 'opacity-0' : 'opacity-100'} cursor-grab touch-none`}
    >
      <PlatformItem platform={platform} index={index} />
    </div>
  );
}

export function PlatformPreferences({ platforms: initialPlatforms }: PlatformPreferencesProps) {
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [activePlatform, setActivePlatform] = useState<Platform | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    setActivePlatform(platforms.find((p) => p.id === active.id) || null);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      setPlatforms((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);

        const newIndex = items.findIndex((item) => item.id === over?.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActivePlatform(null);
  }

  return (
    <div className="relative">
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        <div className="space-y-4">
          <Typography variant="small" className="text-gray-500">
            Drag to reorder platforms based on your preference. The first available platform will be used for playback.
          </Typography>

          <SortableContext items={platforms} strategy={verticalListSortingStrategy}>
            <div className="space-y-2">
              {platforms.map((platform, index) => (
                <SortablePlatform key={platform.id} platform={platform} index={index} />
              ))}
            </div>
          </SortableContext>
        </div>

        <DragOverlay>
          {activePlatform ? (
            <div className="rotate-3 w-full">
              <PlatformItem platform={activePlatform} index={platforms.findIndex((p) => p.id === activePlatform.id)} />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
