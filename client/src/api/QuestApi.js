import { get, post, destroy } from "./AxiosCreate";

class QuestApi {
    getQuestState = async () => {
        const res = await get('quest-state');
        return res.data.data;
    }

    createQuestState = async (quest) => {
        const res = await post('quest-state', {
            quest: quest.title,
            timer: quest.timer,
            musicThemeId:  quest.musicThemeId,
            musicUserFlag: quest.musicUserFlag,
        });

        return res.data.data;
    }

    deleteQuestState = async (questId) => {
        const res = await destroy(`quest-state/${questId}`);
        return res.data.data;
    }

    // editQuestStateTimer = async () => {

    // }
}
export default QuestApi;