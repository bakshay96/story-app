/**
 * @swagger
 * components:
 *   schemas:
 *     Contribution:
 *       type: object
 *       properties:
 *         text:
 *           type: string
 *           example: "This is a contribution text."
 *         author:
 *           type: string
 *           example: "JohnDoe"
 *         authorId:
 *           type: string
 *           example: "605c72ef1f1a2c6f37d6c3b5"
 *       required:
 *         - text
 *         - author
 *         - authorId
 *     Story:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           example: "My First Story"
 *         content:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Contribution'
 *         createdBy:
 *           type: string
 *           example: "605c72ef1f1a2c6f37d6c3b5"
 *         contributors:
 *           type: array
 *           items:
 *             type: string
 *             example: "605c72ef1f1a2c6f37d6c3b5"
 *         maxContributions:
 *           type: integer
 *           example: 10
 *       required:
 *         - title
 *         - content
 *         - createdBy
 *     ErrorResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           example: "Error message"
 *         data:
 *           type: object
 *           example: {}
 */

/**
 * @swagger
 * /api/stories/create:
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "My First Story"
 *               text:
 *                 type: string
 *                 example: "Once upon a time, there was a brave knight."
 *     responses:
 *       201:
 *         description: Story created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/stories:
 *   get:
 *     summary: Get a list of stories
 *     tags: [Stories]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched stories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Story'
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/stories/{id}:
 *   get:
 *     summary: Get a specific story by ID
 *     tags: [Stories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the story
 *         schema:
 *           type: string
 *           example: "605c72ef1f1a2c6f37d6c3b5"
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully fetched the story
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 *       404:
 *         description: Story not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */

/**
 * @swagger
 * /api/stories/{id}/contribute:
 *   post:
 *     summary: Add a contribution to a story
 *     tags: [Stories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the story
 *         schema:
 *           type: string
 *           example: "605c72ef1f1a2c6f37d6c3b5"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               text:
 *                 type: string
 *                 example: "The knight fought bravely and won the battle."
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successfully added contribution
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Story'
 *       403:
 *         description: Forbidden, user cannot contribute
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Story not found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       401:
 *         description: Unauthorized, token is missing or invalid
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */