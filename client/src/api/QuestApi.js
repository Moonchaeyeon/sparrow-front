import { get, post, put, destroy } from "./AxiosCreate";

class QuestApi {
    getQuestState = async () => {
        const res = await get('quest-state');
        return res.data;
    }

    createQuestState = async (quest) => {
        const res = await post('quest-state', {
            title: quest.title,
            timer: quest.timer,
            musicThemeId:  quest.musicThemeId,
            musicUseFlag: quest.musicUseFlag,
        });

        return res.data;
    }

    deleteQuestState = async (questId) => {
        const res = await destroy(`quest-state`, {
            questStateId: questId
        });
        return res.data.data;
    }

    editQuestStateTimer = async (timer) => {
        const res = await put('quest-state/timer', {
            timer: timer
        });
        return res.data;
    }
}
export default QuestApi;