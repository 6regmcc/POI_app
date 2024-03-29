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

  test("delete a poi", async () => {
    const poi = await poiService.createPoi(tiknock);
    const response = await poiService.deletePoi(poi._id);
    assert.equal(response.status, 204);
    try {
      const returnedPoi = await poiService.getPoi(poi.id);
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Poi with this id", "Incorrect Response Message");
    }
  });

  test("create multiple pois", async () => {
    for (let i = 0; i < testPois.length; i += 1) {
      testPois[i].userid = user._id;
      // eslint-disable-next-line no-await-in-loop
      await poiService.createPoi(testPois[i]);
    }
    let returnedLists = await poiService.getAllPois();
    assert.equal(returnedLists.length, testPois.length);
    await poiService.deleteAllPois();
    returnedLists = await poiService.getAllPois();
    assert.equal(returnedLists.length, 0);
  });

  test("remove non-existant poi", async () => {
    try {
      const response = await poiService.deletePoi("not an id");
      assert.fail("Should not return a response");
    } catch (error) {
      assert(error.response.data.message === "No Poi with this id", "Incorrect Response Message");
    }
  });
});
