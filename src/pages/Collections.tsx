import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Folder, Trash2, Edit3, Save, X } from 'lucide-react';
import { collectionService } from '../services/collectionService';
import { projectService } from '../services/projectService';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { cn } from '../utils';
import type { Collection } from '../types';

const inputClasses =
  'w-full px-3 py-2 bg-white/[0.04] border border-white/[0.08] rounded-xl text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/50 transition-colors';

const Collections = () => {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [editingDesc, setEditingDesc] = useState('');
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setCollections(collectionService.getAll());
    setLoading(false);
  }, []);

  const handleCreate = () => {
    if (!newName.trim()) return;

    const newCollection = collectionService.create({
      name: newName.trim(),
      description: newDesc,
      projectIds: [],
      tags: [],
      visibility: 'private',
      ordering: collections.length + 1,
    });

    setCollections([...collections, newCollection]);
    setShowCreate(false);
    setNewName('');
    setNewDesc('');
  };

  const handleUpdate = (id: string) => {
    const updated = collectionService.update(id, {
      name: editingName,
      description: editingDesc,
    });

    if (updated) {
      setCollections(collections.map((c) => (c.id === id ? updated : c)));
    }
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Delete this collection?')) {
      const success = collectionService.delete(id);
      if (success) {
        setCollections(collections.filter((c) => c.id !== id));
      }
    }
  };

  const startEdit = (collection: Collection) => {
    setEditingId(collection.id);
    setEditingName(collection.name);
    setEditingDesc(collection.description);
  };

  const allProjects = projectService.getAll();

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen py-8"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Collections</h1>
            <p className="text-white/40 mt-1 text-sm">Organize projects into collections</p>
          </div>
          <Button onClick={() => setShowCreate(true)}>
            <Plus className="w-4 h-4" /> New Collection
          </Button>
        </motion.div>

        {showCreate && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="p-5">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Collection name"
                className={inputClasses}
                autoFocus
              />
              <textarea
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="Description (optional)"
                className={cn(inputClasses, 'mt-2 resize-none')}
                rows={3}
              />
              <div className="flex gap-2 mt-4">
                <Button size="sm" onClick={handleCreate}>
                  <Save className="w-3.5 h-3.5" /> Create Collection
                </Button>
                <Button size="sm" variant="secondary" onClick={() => { setShowCreate(false); setNewName(''); setNewDesc(''); }}>
                  <X className="w-3.5 h-3.5" /> Cancel
                </Button>
              </div>
            </Card>
          </motion.div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="bg-white/[0.04] rounded-2xl border border-white/[0.06] p-5 animate-pulse">
                <div className="h-6 bg-white/[0.08] rounded w-1/2 mb-3" />
                <div className="h-4 bg-white/[0.06] rounded w-3/4 mb-6" />
                <div className="h-px bg-white/[0.06] mb-4" />
                <div className="h-4 bg-white/[0.06] rounded w-1/4 mb-3" />
                <div className="space-y-2">
                  <div className="h-3 bg-white/[0.06] rounded w-3/4" />
                  <div className="h-3 bg-white/[0.06] rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : collections.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="text-center py-16 px-6">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/15 border border-indigo-500/20 flex items-center justify-center mx-auto mb-4">
                <Folder className="w-6 h-6 text-indigo-300" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">No collections yet</h3>
              <p className="text-white/40 mb-6">Get started by creating a new collection</p>
              <Button onClick={() => setShowCreate(true)}>
                <Plus className="w-4 h-4" /> Create Collection
              </Button>
            </Card>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {collections.map((collection, index) => (
              <motion.div
                key={collection.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card hover className="h-full overflow-hidden flex flex-col">
                  <div className="p-5 border-b border-white/[0.06]">
                    <div className="flex items-start justify-between gap-3">
                      {editingId === collection.id ? (
                        <input
                          type="text"
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          className={cn(inputClasses, 'font-semibold')}
                          autoFocus
                        />
                      ) : (
                        <h3 className="text-lg font-bold text-white tracking-tight break-words">
                          {collection.name}
                        </h3>
                      )}
                      <div className="flex items-center gap-1 shrink-0">
                        {editingId === collection.id ? (
                          <>
                            <button
                              onClick={() => handleUpdate(collection.id)}
                              className="p-1.5 rounded-lg text-emerald-300 hover:bg-emerald-500/10 transition-colors"
                              aria-label="Save"
                            >
                              <Save className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setEditingId(null)}
                              className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-white/[0.06] transition-colors"
                              aria-label="Cancel"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              onClick={() => startEdit(collection)}
                              className="p-1.5 rounded-lg text-white/40 hover:text-indigo-300 hover:bg-indigo-500/10 transition-colors"
                              aria-label="Edit"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(collection.id)}
                              className="p-1.5 rounded-lg text-white/40 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
                              aria-label="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {editingId === collection.id ? (
                      <textarea
                        value={editingDesc}
                        onChange={(e) => setEditingDesc(e.target.value)}
                        placeholder="Description"
                        className={cn(inputClasses, 'mt-2 resize-none')}
                        rows={2}
                      />
                    ) : (
                      collection.description && (
                        <p className="text-sm text-white/60 mt-2 line-clamp-2">
                          {collection.description}
                        </p>
                      )
                    )}
                  </div>

                  <div className="p-5 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-white/40">
                        {collection.projectIds.length}{' '}
                        {collection.projectIds.length === 1 ? 'Project' : 'Projects'}
                      </span>
                      <Badge
                        size="sm"
                        variant={collection.visibility === 'public' ? 'primary' : 'default'}
                      >
                        {collection.visibility}
                      </Badge>
                    </div>
                    {collection.projectIds.length > 0 ? (
                      <div className="space-y-1.5">
                        {collection.projectIds.slice(0, 4).map((pid) => {
                          const project = allProjects.find((p) => p.id === pid);
                          return (
                            <div
                              key={pid}
                              className={cn(
                                'text-sm flex items-center gap-2 truncate',
                                project ? 'text-white/60' : 'text-white/30'
                              )}
                            >
                              <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                              {project ? project.title : 'Unassigned project'}
                            </div>
                          );
                        })}
                        {collection.projectIds.length > 4 && (
                          <p className="text-xs text-white/30 pl-3">
                            +{collection.projectIds.length - 4} more
                          </p>
                        )}
                      </div>
                    ) : (
                      <p className="text-xs text-white/30">No projects in this collection</p>
                    )}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Collections;
