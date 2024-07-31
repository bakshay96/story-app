/**
 * @swagger
 * components:
 *   schemas:
 *     Story:
 *       type: object
 *       required:
 *         - title
 *         - initialSentence
 *       properties:
 *         title:
 *           type: string
 *           description: The story title
 *         initialSentence:
 *           type: string
 *           description: The first sentence of the story
 *       example:
 *         title: My First Story
 *         initialSentence: This is the beginning of a great adventure.
 */

/**
 * @swagger
 * /api/stories:
 *   post:
 *     summary: Create a new story
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Story'
 *     responses:
 *       201:
 *         description: Story created successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 */


/**
 * @swagger
 * /api/stories:
 *   get:
 *     summary: Get the list of stories
 *     tags: [Stories]
 *     responses:
 *       200:
 *         description: List of stories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 */


/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get a specific story by ID
 *     tags: [Stories]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The story ID
 *     responses:
 *       200:
 *         description: Story data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 *       404:
 *         description: Story not found
 */


/**
 * @swagger
 * /api/stories/{id}/contribute:
 *   post:
 *     summary: Add a contribution to a story
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The story ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contribution:
 *                 type: string
 *                 description: The contribution text
 *             example:
 *               contribution: This is the next part of the story.
 *     responses:
 *       200:
 *         description: Contribution added successfully
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Story not found
 */