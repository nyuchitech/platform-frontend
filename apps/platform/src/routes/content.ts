/**
 * 🇿🇼 Nyuchi Platform - Content Routes
 * "I am because we are" - Content submission endpoints
 */

import { Hono } from 'hono';
import { authMiddleware, requireRole, requireModerator } from '../lib/auth';
import {
  createSupabaseClient,
  getPublishedContent,
  getContentSubmission,
  createContentSubmission,
  updateContentSubmission,
  deleteContentSubmission,
  publishContentSubmission,
} from '../lib/database';
import { UBUNTU_POINTS } from '../lib/ubuntu';
import { Env } from '../index';

const content = new Hono<{ Bindings: Env }>();

/**
 * GET /api/content
 * List published content (public)
 */
content.get('/', async (c) => {
  try {
    const client = createSupabaseClient(c.env);

    // Parse query params
    const type = c.req.query('type');
    const category = c.req.query('category');
    const page = parseInt(c.req.query('page') || '1');
    const limit = parseInt(c.req.query('limit') || '25');

    const filters = {
      type,
      category,
      page,
      limit,
    };

    const { data, count } = await getPublishedContent(client, filters);

    return c.json({
      data,
      pagination: {
        page,
        limit,
        total: count,
        pages: Math.ceil(count / limit),
      },
      ubuntu: 'I am because we are',
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return c.json({ error: 'Failed to fetch content' }, 500);
  }
});

/**
 * GET /api/content/:slug
 * Get single content by slug (public)
 */
content.get('/:slug', async (c) => {
  try {
    const client = createSupabaseClient(c.env);
    const slug = c.req.param('slug');

    const submission = await getContentSubmission(client, slug);

    if (!submission) {
      return c.json({ error: 'Content not found' }, 404);
    }

    // Only show published content to public
    if (submission.status !== 'published') {
      return c.json({ error: 'Content not found' }, 404);
    }

    return c.json({
      data: submission,
      ubuntu: 'I am because we are',
    });
  } catch (error) {
    console.error('Error fetching content:', error);
    return c.json({ error: 'Failed to fetch content' }, 500);
  }
});

/**
 * POST /api/content
 * Submit content (contributor/moderator/admin)
 */
content.post('/', authMiddleware, requireRole('contributor', 'moderator', 'admin'), async (c) => {
  try {
    const client = createSupabaseClient(c.env);
    const user = c.get('user');
    const body = await c.req.json();

    const submission = await createContentSubmission(client, {
      user_id: user.id,
      title: body.title,
      slug: body.slug,
      content_type: body.content_type,
      content_body: body.content_body,
      excerpt: body.excerpt,
      featured_image_url: body.featured_image_url,
      category: body.category,
      tags: body.tags || [],
      seo_title: body.seo_title,
      seo_description: body.seo_description,
    });

    if (!submission) {
      return c.json({ error: 'Failed to create content' }, 500);
    }

    return c.json({
      message: 'Content submitted for review',
      ubuntu: 'Your contribution strengthens our community',
      data: submission,
    }, 201);
  } catch (error) {
    console.error('Error creating content:', error);
    return c.json({ error: 'Failed to create content' }, 500);
  }
});

/**
 * PUT /api/content/:id
 * Update own content (authenticated)
 */
content.put('/:id', authMiddleware, requireRole('contributor', 'moderator', 'admin'), async (c) => {
  try {
    const client = createSupabaseClient(c.env);
    const user = c.get('user');
    const id = c.req.param('id');
    const body = await c.req.json();

    // Check ownership
    const existing = await getContentSubmission(client, id);
    if (!existing) {
      return c.json({ error: 'Content not found' }, 404);
    }

    if (existing.user_id !== user.id && user.role !== 'admin' && user.role !== 'moderator') {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const submission = await updateContentSubmission(client, id, body);

    if (!submission) {
      return c.json({ error: 'Failed to update content' }, 500);
    }

    return c.json({
      message: 'Content updated successfully',
      ubuntu: 'I am because we are',
      data: submission,
    });
  } catch (error) {
    console.error('Error updating content:', error);
    return c.json({ error: 'Failed to update content' }, 500);
  }
});

/**
 * DELETE /api/content/:id
 * Delete own content (authenticated)
 */
content.delete('/:id', authMiddleware, requireRole('contributor', 'moderator', 'admin'), async (c) => {
  try {
    const client = createSupabaseClient(c.env);
    const user = c.get('user');
    const id = c.req.param('id');

    // Check ownership
    const existing = await getContentSubmission(client, id);
    if (!existing) {
      return c.json({ error: 'Content not found' }, 404);
    }

    if (existing.user_id !== user.id && user.role !== 'admin' && user.role !== 'moderator') {
      return c.json({ error: 'Unauthorized' }, 403);
    }

    const success = await deleteContentSubmission(client, id);

    if (!success) {
      return c.json({ error: 'Failed to delete content' }, 500);
    }

    return c.json({
      message: 'Content deleted successfully',
      ubuntu: 'I am because we are',
    });
  } catch (error) {
    console.error('Error deleting content:', error);
    return c.json({ error: 'Failed to delete content' }, 500);
  }
});

/**
 * POST /api/content/:id/publish
 * Publish content (moderator/admin)
 */
content.post('/:id/publish', authMiddleware, requireModerator, async (c) => {
  try {
    const client = createSupabaseClient(c.env);
    const user = c.get('user');
    const id = c.req.param('id');
    const { ubuntu_points } = await c.req.json();

    const submission = await publishContentSubmission(
      client,
      id,
      user.id,
      ubuntu_points || UBUNTU_POINTS.content_published
    );

    if (!submission) {
      return c.json({ error: 'Failed to publish content' }, 500);
    }

    // TODO: Award Ubuntu points to content creator
    // TODO: Send publication notification email

    return c.json({
      message: 'Content published successfully',
      ubuntu: 'Your contribution strengthens our community',
      data: submission,
    });
  } catch (error) {
    console.error('Error publishing content:', error);
    return c.json({ error: 'Failed to publish content' }, 500);
  }
});

/**
 * POST /api/content/:id/reject
 * Reject content (moderator/admin)
 */
content.post('/:id/reject', authMiddleware, requireModerator, async (c) => {
  try {
    const client = createSupabaseClient(c.env);
    const id = c.req.param('id');
    const { feedback } = await c.req.json();

    const submission = await updateContentSubmission(client, id, {
      status: 'rejected',
      reviewer_feedback: feedback,
    });

    if (!submission) {
      return c.json({ error: 'Failed to reject content' }, 500);
    }

    // TODO: Send rejection notification email with feedback

    return c.json({
      message: 'Content rejected',
      ubuntu: 'I am because we are',
      data: submission,
    });
  } catch (error) {
    console.error('Error rejecting content:', error);
    return c.json({ error: 'Failed to reject content' }, 500);
  }
});

export default content;
