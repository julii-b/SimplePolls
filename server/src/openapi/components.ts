/**
 * @openapi
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       description: |
 *         Identifies the user.
 *         If missing or invalid, the server will create a new user automatically.
 *         The new token is returned in the `X-New-Token` header.
 *   headers:
 *     X-New-Token:
 *       description: |
 *         Part of the response if the server automatically created a user.
 *         Use this token as a Bearer token for all following requests.
 *       schema:
 *         type: string
 *       required: false
 *   schemas:
 *     Poll:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         ownerId:
 *           type: integer
 *           example: 1
 *         questionText:
 *           type: string
 *           example: "Is this a question?"
 *         answers:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Answer"
 *     Answer:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         answerText:
 *           type: string
 *           example: "Yes"
 *         votes:
 *           type: array
 *           items:
 *             $ref: "#/components/schemas/Vote"
 *     Vote:
 *       type: object
 *       properties:
 *         userId:
 *           type: integer
 *           example: 1
 *         answerId:
 *           type: integer
 *           example: 1
 */
