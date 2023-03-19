import { EventEmitter } from "events";
import { assert } from "chai";
import { poiService } from "./poi-service.js";
import { assertSubset } from "../test-utils.js";
import { tiknock, maggie, testPois } from "../fixtures.js";

EventEmitter.setMaxListeners(25);

suite("Poi API tests", () => {
  let user = null;

  setup(async () => {
    await poiService.deleteAllPois();
    await poiService.deleteAllUsers();
    user = await poiService.createUser(maggie);
    tiknock.userid = user._id;
  });

  teardown(async () => {});

  test("create poi", async () => {
    const returnedPoi = await poiService.createPoi(tiknock);
    assert.isNotNull(returnedPoi);
    assertSubset(tiknock, returnedPoi);
  });

  test("delete a playlist", async () => {});

  test("create multiple playlists", async () => {});

  test("remove non-existant playlist", async () => {});
});
