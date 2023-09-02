CREATE TABLE "tasks" (
  "id" serial primary key,
  "text" varchar(250) not null,
  "isComplete" boolean default "false",
);



INSERT INTO "tasks" ("text") 
VALUES ('take out trash');

INSERT INTO "tasks" ("text") 
VALUES ('clean dishes');

INSERT INTO "tasks" ("text") 
VALUES ('mop the floor');