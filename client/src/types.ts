export type UserCreatedPoll = {
    question: string,
    answers: UserCreatedAnswerOption[],
}
export type Poll = {
    id: number,
    question: string,
    answers: AnswerOption[]
}


export type UserCreatedAnswerOption = {
    text: string
}
export type AnswerOption = {
    id: number,
    text: string,
    selectedCount: number
}


// Database draft:

export type PolllInDB = {
    id: number,
    creatorId: number,
    question: string,
    answerIDs: number[],
    joinedUsers: number[]
}

export type AnswerOptionInDB = {
    id: number,
    text: string
}

export type AnswerInDB = {
    answerID: number,
    userID: number
}