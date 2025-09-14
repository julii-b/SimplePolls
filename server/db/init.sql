CREATE TABLE users (
  id
    INTEGER
    GENERATED ALWAYS AS IDENTITY
    PRIMARY KEY,
  user_token
    TEXT
    NOT NULL
    UNIQUE,
  created_at
    TIMESTAMPTZ
    NOT NULL
    DEFAULT now()
);


CREATE TABLE polls (
  id
    INTEGER
    GENERATED ALWAYS AS IDENTITY
    PRIMARY KEY,
  owner_id
    INTEGER
    NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,
  question_text
    TEXT
    NOT NULL,
  created_at
    TIMESTAMPTZ
    NOT NULL
    DEFAULT now()
);

CREATE INDEX idx_polls_owner_id ON polls(owner_id);


CREATE TABLE answers (
  id
    INTEGER
    GENERATED ALWAYS AS IDENTITY
    PRIMARY KEY,
  poll_id
    INTEGER
    NOT NULL
    REFERENCES polls(id)
    ON DELETE CASCADE,
  answer_text TEXT
    NOT NULL,
  created_at
    TIMESTAMPTZ
    NOT NULL
    DEFAULT now()
);

CREATE INDEX idx_answers_poll_id ON answers(poll_id);


CREATE TABLE answers_given_by_users (
  user_id
    INTEGER
    NOT NULL
    REFERENCES users(id)
    ON DELETE CASCADE,
  answer_id
    INTEGER
    NOT NULL 
    REFERENCES answers(id)
    ON DELETE CASCADE,
  created_at
    TIMESTAMPTZ
    NOT NULL
    DEFAULT now(),
  PRIMARY KEY (user_id, answer_id)
);

CREATE INDEX idx_answers_given_by_users_answer_id ON answers_given_by_users(answer_id);