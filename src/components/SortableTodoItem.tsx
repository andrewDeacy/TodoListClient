/**
 * Sortable TodoItem Component
 * 
 * Wrapper component that makes TodoItem draggable using @dnd-kit.
 * Provides drag handle and drag-and-drop functionality.
 */

import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import TodoItem, { TodoItemProps } from './TodoItem';

/**
 * Props for SortableTodoItem component
 * Extends TodoItemProps with item ID for drag-and-drop
 */
export interface SortableTodoItemProps extends Omit<TodoItemProps, 'item'> {
  /**
   * The todo item data to display
   */
  item: TodoItemProps['item'];
  
  /**
   * Unique identifier for drag-and-drop (must be item.id)
   */
  id: string;
}

/**
 * Sortable TodoItem Component
 * 
 * Wraps TodoItem with drag-and-drop functionality using @dnd-kit.
 * Provides visual drag handle and handles drag state.
 * 
 * @example
 * ```tsx
 * <SortableTodoItem
 *   id={item.id}
 *   item={item}
 *   listId={listId}
 *   isFirst={index === 0}
 *   isLast={index === items.length - 1}
 *   onMoveUp={() => handleMoveUp(index)}
 *   onMoveDown={() => handleMoveDown(index)}
 * />
 * ```
 */
const SortableTodoItem: React.FC<SortableTodoItemProps> = ({
  id,
  item,
  ...props
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <div className="flex items-start gap-2">
        {/* Drag Handle */}
        <button
          {...attributes}
          {...listeners}
          className="flex-shrink-0 mt-2 p-2 text-gray-400 hover:text-gray-600 cursor-grab active:cursor-grabbing focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 rounded"
          aria-label={`Drag to reorder "${item.title}"`}
          title="Drag to reorder"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="12" r="1" />
            <circle cx="9" cy="5" r="1" />
            <circle cx="9" cy="19" r="1" />
            <circle cx="15" cy="12" r="1" />
            <circle cx="15" cy="5" r="1" />
            <circle cx="15" cy="19" r="1" />
          </svg>
        </button>
        
        {/* TodoItem */}
        <div className="flex-1">
          <TodoItem item={item} {...props} />
        </div>
      </div>
    </div>
  );
};

export default SortableTodoItem;
