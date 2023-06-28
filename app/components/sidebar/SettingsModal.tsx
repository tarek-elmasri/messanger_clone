"use client";

import { User } from "@prisma/client";
import { useRouter } from "next/navigation";
import Modal from "../Modal";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { CloudinaryResult } from "@/app/types";
import axios from "axios";
import { toast } from "react-hot-toast";
import Input from "../input/Input";
import Image from "next/image";
import { CldUploadButton } from "next-cloudinary";
import Button from "../Button";

interface SettingsModalProps {
  currentUser: User;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({
  currentUser,
  isOpen,
  onClose,
}) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: currentUser?.name,
      image: currentUser?.image,
    },
  });

  const image = watch("image");

  const handleUpload = (result: CloudinaryResult) => {
    setValue("image", result?.info?.secure_url, { shouldValidate: true });
  };

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setIsLoading(true);
    axios
      .post("/api/settings", data)
      .then(() => {
        router.refresh();
        onClose();
      })
      .catch(() => toast.error("Something went wrong"))
      .finally(() => setIsLoading(false));
  };
  return (
    <Modal onClose={onClose} isOpen={isOpen}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-12">
          <div
            className="
          border-b
          border-gray-900/10
          pb-12
          "
          >
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Edit yourpublic information
            </p>

            <div className="mt-10 flex flex-col gap-y-8">
              <Input
                disabled={isLoading}
                id="name"
                label="Name"
                errors={errors}
                required
                register={register}
              />

              <div>
                <label className="block text-sm font-medium leading-6 text-gray-900">
                  Photo
                </label>

                <div className="mt-2 flex items-center gap-x-3">
                  <Image
                    alt="avatar"
                    width={48}
                    height={48}
                    className="rounded-full"
                    src={
                      image || currentUser?.image || "/images/placeholder.jpg"
                    }
                  />
                  <CldUploadButton
                    options={{ maxFiles: 1 }}
                    onUpload={handleUpload}
                    uploadPreset="woo384uc"
                  >
                    <p className="font-medium tracking-tight space ml-4">
                      Change
                    </p>
                  </CldUploadButton>
                </div>
              </div>
            </div>
          </div>

          <div
            className="
          mt-6 flex items-center justify-end gap-x-6
          "
          >
            <Button
              disabled={isLoading}
              secondary
              onClick={onClose}
              type="button"
            >
              Cancel
            </Button>
            <Button disabled={isLoading} type="submit">
              Save
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  );
};

export default SettingsModal;
