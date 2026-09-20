export type Resource = 'project' | 'document' | 'user' | 'organization' | 'all';
export type Action = 'create' | 'read' | 'update' | 'delete' | 'manage';

export type Permission = `${Resource}:${Action}` | 'admin:all';