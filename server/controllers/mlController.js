import mlModel from "../models/mlModel.js";

export const storedata = async (req, res) => {
  if(req.body.length === 0){
    res.status(200).send("Hello")
    return;
  }

  await mlModel.deleteMany();
  
  try {
    const model = await mlModel.create({
      emotionData: req.body,
    });

    console.log(model);
    res.status(200).json({message: "Hello Piyush"});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getData = async (req, res) => {
  console.log(req.method);

  try {
    const data = await mlModel.find();
    console.log(data);

    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
