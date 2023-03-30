import type { NextApiRequest, NextApiResponse, PageConfig } from "next";
import formidable from "formidable";
import cloudinary from "@/lib/cloudinary";
import prisma from "@/lib/prisma";

export const config: PageConfig = {
  api: {
    bodyParser: false,
  },
};

function formidablePromise(
  req: NextApiRequest,
  opts?: Parameters<typeof formidable>[0]
): Promise<{ fields: formidable.Fields; files: formidable.Files }> {
  return new Promise((resolve, reject) => {
    const form = formidable(opts);
    form.parse(req, (err, fields, files) => {
      if (err) {
        return reject(err);
      }
      return resolve({ fields, files });
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(404).end();
  const { fields, files } = await formidablePromise(req);
  const result = await cloudinary.uploader.upload(files.file.filepath, {
    folder: process.env.CLOUDINARY_FOLDER,
  });
  const hilal = await prisma.hilal.create({
    data: {
      description: fields.description,
      images: {
        create: {
          id: result.public_id,
          url: result.secure_url,
          type: "TELESCOPE",
        },
      },
      owner: {
        connect: {
          id: 1,
        },
      },
    },
  });
  res.status(200).json(JSON.stringify(hilal));
}
