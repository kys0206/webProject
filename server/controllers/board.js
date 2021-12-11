import * as model from '../models/Board';
import * as userModel from '../models/User';

import DOMPurify from 'isomorphic-dompurify';

export const writeBoard = async (req, res, next) => {
	try {
		const { title, post } = req.body;
        const cleanTitle = DOMPurify.sanitize(title);
        const cleanPost = DOMPurify.sanitize(post);
		const userId = req.userId;
		const name = (await userModel.getUserData(userId, null)).name;
		const result = await model.addBoard(userId, name, cleanTitle, cleanPost);
		res.json({ status: true, data: { boardId: result.boardId } });
	} catch (e) {
		next(e);
	}
};

export const deleteBoard = async (req, res, next) => {
	try {
		const { boardId } = req.body;
		const userId = req.userId;
		if (!(await model.checkExists(boardId))) throw error.ERR_BOARD_NOT_EXISTS;
		if (!(await model.checkWriter(boardId, userId))) throw error.ERR_USER_INCORRECT;
		await model.deleteBoard(boardId);
		await commentModel.removeComments(boardId);
		res.json({ status: true, data: null });
	} catch (e) {
		next(e);
	}
};

export const modifyBoard = async (req, res, next) => {
	try {
		const { boardId, title, post } = req.body;
        const cleanTitle = DOMPurify.sanitize(title);
        const cleanPost = DOMPurify.sanitize(text);
		const userId = req.userId;
		if (!(await model.checkExists(boardId))) throw error.ERR_BOARD_NOT_EXISTS;
		if (!(await model.checkWriter(boardId, userId))) throw error.ERR_USER_INCORRECT;
		await model.modifyBoard(boardId, cleanTitle, cleanPost);
		res.json({ status: true, data: null });
	} catch (e) {
		next(e);
	}
};

export const listBoard = async (req, res, next) => {
	try {
		const { start, end } = req.query;
		const result = await model.getBoard(start, end);
		res.json({ status: true, data: result });
	} catch (e) {
		next(e);
	}
};

export const viewBoard = async (req, res, next) => {
	try {
		const { boardId } = req.params;
		if (!(await model.checkExists(boardId))) throw error.ERR_BOARD_NOT_EXISTS;
		const result = await model.getBoard(boardId);
		await model.increaseView(boardId);
		res.json({ status: true, data: result });
	} catch (e) {
		next(e);
	}
};

export const voteBoard = async (req, res, next) => {
	try {
		const { boardId, voteType } = req.body;
		const userId = req.userId;
		if (!(await model.checkExists(boardId))) throw error.ERR_BOARD_NOT_EXISTS;
		if (await voteModel.isVoted(boardId, userId, voteType)) throw error.ERR_ALREADY_VOTED;
        if (voteType !== 'u' && voteType !== 'd') throw error.ERR_VOTE_TYPE_INVALID;
		await voteModel.voteBoard(boardId, userId, voteType);
        const { upVote, downVote } = await model.increaseVote(boardId, voteType);
		res.json({ status: true, data: { boardId, upVote, downVote } });
	} catch (e) {
		next(e);
	}
};
