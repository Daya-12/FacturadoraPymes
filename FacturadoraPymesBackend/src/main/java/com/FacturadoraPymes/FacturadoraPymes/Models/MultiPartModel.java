package com.FacturadoraPymes.FacturadoraPymes.Models;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MultiPartModel {
	public String name;
	public String originalFilename;
	public String contentType;
	public byte[] bytes;
	public long size;
}
