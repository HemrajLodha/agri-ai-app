import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import strings from "../../../assets/strings";
import { showAlertMessage } from "../../utils";

const cotton_prediction_classes = {
    "bacterial_blight": {
        english: "Bacterial Blight",
        hindi: "जीवाणुजनित ब्लाइट",
        hindi_desc: "जीवाणुजनित ब्लाइट यह जीवाणु बीज से लेकर फसल तक सभी चरणों पर हमला करता है। आमतौर पर लक्षणों के पाँच सामान्य चरण देखे जाते हैं। बीजपत्रों पर छोटे, जलयुक्त, गोलाकार या अनियमित घाव विकसित हो जाते हैं, बाद में संक्रमण डंठलों से होकर तने तक फैल जाता है और पौधे मुरझाकर मर जाते हैं।"
    },
    "curl_virus": {
        english: "Curl Virus",
        hindi: "कपास पत्ती कर्ल वायरस",
        hindi_desc: "कपास पत्ती कर्ल वायरस ( सीएलसीयूवी ) जेमिनीविरिडे परिवार के कई पादप रोगजनक वायरस प्रजातियां हैं। एशिया और अफ्रीका में कपास की मुख्य बीमारी कॉटन लीफ कर्ल जेमिनीवायरस (CLCuV) के कारण होती है। संक्रमित कपास की पत्तियाँ ऊपर की ओर मुड़ जाती हैं और नीचे की तरफ पत्ती जैसी आकृतियाँ बन जाती हैं, साथ ही नसें मोटी हो जाती हैं।"
    },
    "fussarium_wilt": {
        english: "Fussarium Wilt",
        hindi: "फ्यूजेरियम विल्ट रोग",
        hindi_desc: "फ्यूजेरियम विल्ट रोग एक फफूंद रोग है जो कपास की फसल को नुकसान पहुंचाता है। यह फफूंद कपास के पौधों की जड़ों और तने को संक्रमित करती है, जिससे पौधे की वृद्धि और उत्पादन प्रभावित होता है।"
    },
    "healthy": {
        english: "Healthy Cotton",
        hindi: "स्वस्थ कपास",
        hindi_desc: `
        स्वस्थ पत्तियाँ पौधे के समग्र स्वास्थ्य और अच्छी फसल के संकेतक होती हैं।\n
        रंग: स्वस्थ कपास की पत्तियाँ गहरे हरे रंग की होती हैं। पीले, भूरे, या अन्य असामान्य रंगों का होना किसी बीमारी या पोषण की कमी का संकेत हो सकता है।\n
        आकार: स्वस्थ पत्तियाँ समरूप होती हैं और उनकी संरचना सही होती है। किसी भी प्रकार की असामान्यता, जैसे कि मुड़ी हुई या असमान आकार की पत्तियाँ, पौधे की समस्या का संकेत हो सकती है।\n
        पत्तियों का बनावट: स्वस्थ पत्तियाँ चिकनी होती हैं और उन पर किसी भी प्रकार की फफूंद, धब्बे, या घाव नहीं होते। पत्तियों का मुलायम और चमकदार बनावट पौधे के अच्छे स्वास्थ्य का संकेत है।\n
        नाड़ी (Veins): पत्तियों की नसें स्पष्ट और मजबूत होनी चाहिए। नसों का पीला या कमजोर होना पौधे के अंदरूनी पोषण की कमी का संकेत हो सकता है।\n
        मोटाई: स्वस्थ पत्तियाँ थोड़ी मोटी होती हैं। अगर पत्तियाँ पतली या झड़ने लगती हैं, तो यह किसी समस्या का संकेत हो सकता है।\n
        कीट और रोग: स्वस्थ पत्तियों पर किसी भी प्रकार के कीट, रोग, या फंगस के लक्षण नहीं होने चाहिए। पत्तियों पर छोटे छिद्र, चबाए जाने के निशान, या धब्बे बीमारी या कीट हमले का संकेत हो सकते हैं।`
    }
};

const ACTION_PREDICT_DISEASE = "predict/ACTION_PREDICT_DISEASE";

const post_url = "https://asia-south2-crop-disease-detector-431714.cloudfunctions.net/predict";

const initialState = {
    status: false,
    error: null,
    loading: false,
    data: {},
    imageUri: null
};

const localizedData = (class_name, confidence) => {
    if (!!class_name) {
        return { ...cotton_prediction_classes[class_name], probability: confidence };
    }
    return {
        english: "Cotton leaf image not found.",
        hindi: "यह कपास के पत्ते की छवि नहीं है!",
        hindi_desc: `यह कपास के पत्ते की छवि नहीं है! कृपया कपास पत्ती की छवि पर क्लिक करें!`,
        probability: 0
    }
}

export const predictCottonDisease = createAsyncThunk(ACTION_PREDICT_DISEASE,
    async (data, thunkApi) => {
        try {
            const formData = new FormData();
            formData.append('file', {
                uri: data.uri,
                type: 'image/jpeg',
                name: "leaf_sample.jpg",
            });
            const response = await axios.post(post_url, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            return response.data;
        } catch (err) {
            thunkApi.rejectWithValue(err);
        }
    }
)

const diseaseProdictProps = createSlice({
    name: "diseaseProdictProps",
    initialState,
    reducers: {
        updateImageUri: (state, action) => {
            state.imageUri = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(predictCottonDisease.fulfilled, ((state, action) => {
            console.log("request predict fulfilled", action.payload)
            state.loading = false;
            state.data = localizedData(action.payload?.class ?? "", action.payload?.confidence ?? 0);
            state.status = true;
        }))
            .addCase(predictCottonDisease.rejected, (state, action) => {
                console.log("request predict rejected", action.payload)
                state.loading = false;
                state.status = false;
                state.error = action.payload;
                showAlertMessage(strings.app_name, `Failed to test, Try Again\nपरीक्षण विफल रहा, फिर से प्रयास करें!`)
            })
            .addCase(predictCottonDisease.pending, (state) => {
                console.log("request predict pending")
                state.loading = true;
                state.status = false;
            })
    }
})

export const { updateImageUri } = diseaseProdictProps.actions;

export default diseaseProdictProps.reducer;