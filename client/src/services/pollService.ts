import type { Poll, UserCreatedPoll } from './../types.ts';

let polls: Poll[] = [
    {
        "id": 0,
        "question": "What is the capital of France?",
        "answers": [
            { "id": 0, "text": "Brussels", "selectedCount": 1 },
            { "id": 1, "text": "Berlin", "selectedCount": 0 },
            { "id": 2, "text": "Paris", "selectedCount": 2 },
            { "id": 3, "text": "London", "selectedCount": 0 }
        ],
    },
    {
        "id": 1,
        "question": "Which planet is known as the Red Planet?",
        "answers": [
            { "id": 4, "text": "Mars", "selectedCount": 2 },
            { "id": 5, "text": "Venus", "selectedCount": 0 },
            { "id": 6, "text": "Jupiter", "selectedCount": 1 },
            { "id": 7, "text": "Earth", "selectedCount": 0 }
        ],
    },
    {
        "id": 2,
        "question": "How many legs does a dog have?",
        "answers": [
            { "id": 8, "text": "Two", "selectedCount": 0 },
            { "id": 9, "text": "Three", "selectedCount": 0 },
            { "id": 10, "text": "Four", "selectedCount": 2 },
            { "id": 11, "text": "Five", "selectedCount": 1 }
        ],
    }
]

export async function createPoll(poll: UserCreatedPoll): Promise<number> {
    const newId = polls.length;
    polls.push({
        "id": newId,
        "question": poll.question,
        "answers": poll.answers.map(answer => { return { "id": Math.floor(Math.random()*1000), "text": answer.text, "selectedCount": 0 }; })
    });
    return newId;
}
export async function getPolls(): Promise<Poll[]> {
    return polls;
}
export async function getPoll(pollId: number): Promise<Poll|undefined> {
    for (let poll of polls) {
        if (poll.id === pollId) return poll;
    }
    return undefined;
}

export async function answerPoll(pollId: number, answerId: number): Promise<Poll|undefined> {
    for (let i in polls) {
        if (polls[i].id === pollId) {
            for ( let j in polls[i].answers){
                if (polls[i].answers[j].id === answerId) {
                    polls[i].answers[j].selectedCount++;
                    return getPoll(pollId);
                }
            }
        }
    }
    return undefined;
}