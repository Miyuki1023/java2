import path from 'path';
import express from 'express';

app.use('/uploads', express.static(path.resolve('uploads')));
