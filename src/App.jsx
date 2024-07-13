import { useEffect, useState } from "react";
import "./App.css";
import { addContent, deleteContent, getAll } from "./utils/supabaseFunctions";
import { Loading } from "./Loading";

export const App = () => {
  const [content, setContent] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(false);
  const [totalTime, setTotalTime] = useState(0);
  const [srecords, setSRecords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const onChangeContent = (event) => setContent(event.target.value);

  const onChangeTime = (event) => setTime(event.target.value);

  const onRegister = async () => {
    // 空白の場合は何もしない
    if (!content || !time) {
      setError(true);
      return;
    }
    setError(false);

    // setSRecords((prev) => [
    //   ...prev,
    //   { title: content, time: parseFloat(time) },
    // ]);
    try {
      //supabaseへデータを入れる
      await addContent(content, time);
      //supabaseからデータをフェッチ
      const suparecords = await getAll();
      setSRecords(suparecords);
      setContent("");
      setTime("");
    } catch (error) {
      console.error("Error registering content:", error);
      setError(true);
    }
  };

  const handleDelete = async (id) => {
    await deleteContent(id);
    const suparecords = await getAll();
    setSRecords(suparecords);
  };

  useEffect(() => {
    const getRecords = async () => {
      setIsLoading(true); // ローディング開始
      const suparecords = await getAll();
      setSRecords(suparecords);
      setIsLoading(false); // ローディング終了
    };
    getRecords();
  }, []);

  useEffect(() => {
    const total = srecords.reduce(
      (sum, record) => parseInt(sum + record.time),
      0
    );
    setTotalTime(total);
  }, [srecords]);

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <h1 data-testid="title">学習記録一覧</h1>
          <h2>この下に学習内容を入力してください。</h2>
          <p>今日は何をどれくらいを勉強しましたか？</p>
          <div className="list-row">
            <p>学習内容</p>
            <input value={content} onChange={onChangeContent} type="text" />
          </div>
          <div className="list-row">
            <p>学習時間</p>
            <input value={time} onChange={onChangeTime} type="text" />
            <p>時間</p>
          </div>
          <div>
            <p>入力されている学習内容：{content}</p>
            <p>入力されている時間：{time}時間</p>
            {/* </div>
          <ul>
            {records.map((record, index) => (
              <li key={index}>
                <p>
                  {record.title} {record.time}時間
                </p>
              </li>
            ))}
          </ul>
          <div> */}
            <div>
              <ul>
                {srecords.map((srecord, id) => (
                  <li key={id}>
                    <p>
                      {srecord.content} {srecord.time}時間
                      <button onClick={() => handleDelete(srecord.id)}>
                        削除
                      </button>
                    </p>
                  </li>
                ))}
              </ul>
            </div>
            <button onClick={onRegister}>登録</button>
          </div>
          <div>
            {error ? (
              <p style={{ color: "red" }}>入力されていない項目があります</p>
            ) : (
              ""
            )}
          </div>
          <div>
            <p>合計時間：{totalTime}/ 1000(h)</p>
          </div>
        </>
      )}
    </>
  );
};

export default App;
