---
date: '2026-08-07'
title: 'Robotics Perception Engineer'
company: 'Contoro Robotics'
location: 'Austin, TX'
range: 'July 2025 - Present'
url: 'https://contoro.com/'
---

- Own the perception stack for the entire fleet of autonomous box unloading robots. RGB-D cameras and 2D/3D LiDAR feeding segmentation, point-cloud reconstruction, 6-DoF grasp poses, and obstacle detection.
- Raised segmentation recall 15 points on unseen sites and cut merged/split boxes 40%. Rebuilt the dataset pipeline around visual clustering and negative mining based on field heuristics.
- Train and ship the segmentation and detection models the robots run: PointRend, DETR, SAM and ViT backbones in PyTorch and Detectron2. Redesigned the complete ML development architecture to be scalable and maintainable, allowing developers to systematically evaluate and improve model performance.
- Cut inference time on the robot by 35% and got two models sharing one GPU, by fixing how frames are preprocessed and batched and when weights are held in memory. Exported through ONNX/TensorRT and quantized where accuracy allowed.
- Developed a per-site adaptive learning loop that learns from operator corrections while the robot keeps unloading, then swaps the new weights asynchronously.
- Took box dimension error from about 4 cm down to under 5 mm by measuring faces from mask pixels projected onto the fitted plane, improving the major pipeline algorithms and point cloud manipulation.
- Own calibration for the sensor rig: intrinsics, extrinsics, hand-eye. Solved as rigid-body transforms in SE(3), checked against fiducial targets, and developed an auto calibration pipeline.
- Wrote the point-cloud and 3D LiDAR layer: plane fitting, clustering, outlier rejection, occupancy mapping to construct a high accuracy World Model of the scene at a tight latency budget.
- Developed strategies to tackle the common depth issues like dark surfaces drop out, depth edges throw flying pixels, and multipath interference. That work drives sensor choice and mounting geometry for the future hardware decisions.
