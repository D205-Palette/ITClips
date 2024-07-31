import React from "react";
import { feedStore } from "../../stores/feedStore";
import Roadmap from "../main/Roadmap(Feed)"

export default function newRoadmaps() {
    const { axiosResult } = feedStore();
  return (
    <div>
      {/* 피드 로드맵 목록 */}
      <div id="feedRoadmapList">
        <div className="grid grid-cols-1 gap-3">
          {axiosResult?.roadmaps.map((roadmap) => (
            <div className="newRoadMaps">
              <Roadmap roadmap={roadmap} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
