"""S3-compatible storage helper."""
from __future__ import annotations

from dataclasses import dataclass

import boto3
from botocore.client import Config

from ..core.config import get_settings


@dataclass
class StorageReference:
  bucket: str
  key: str
  url: str | None = None


class StorageService:
  def __init__(self) -> None:
    self.settings = get_settings()
    self.client = boto3.client(
      "s3",
      endpoint_url=self.settings.s3_endpoint_url,
      aws_access_key_id=self.settings.s3_access_key,
      aws_secret_access_key=self.settings.s3_secret_key,
      region_name=self.settings.s3_region,
      config=Config(signature_version="s3v4"),
    )

  def put_object(self, bucket: str, key: str, body: bytes, content_type: str) -> StorageReference:
    self.client.put_object(Bucket=bucket, Key=key, Body=body, ContentType=content_type)
    return StorageReference(bucket=bucket, key=key)

  def generate_presigned_url(self, bucket: str, key: str, expires: int = 3600) -> str:
    return self.client.generate_presigned_url(
      "get_object", Params={"Bucket": bucket, "Key": key}, ExpiresIn=expires
    )
