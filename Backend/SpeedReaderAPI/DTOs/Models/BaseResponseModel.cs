﻿// Licensed to the .NET Foundation under one or more agreements.
// The .NET Foundation licenses this file to you under the MIT license.

namespace SpeedReaderAPI.DTOs.Models
{
    public class BaseResponseModel
    {
        public string Message { get; set; } = "Something went wrong";
        public object Data { get; set; } 

        
    }
    
}