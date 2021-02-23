import { expect } from "chai";
// @ts-ignore
import session from "supertest-session";
import App from "../app";
const agent = session(App);

describe("Test de APIS", () => {
  describe("GET /", () => {
    it("responds with 200", () =>
      agent.get("/v1/videogames/basic/").expect(200));
    it("responds with a message and data", async () => {
      let tmp = await agent.get("/v1/videogames/basic/");
      expect(tmp.body).to.haveOwnProperty(
        "msg",
        "List of the first 15 video games!!"
      );
    });
    it("responds with data", async () => {
      let tmp = await agent.get("/v1/videogames/basic/");
      expect(tmp.body).to.haveOwnProperty("response");
    });
  });
});
