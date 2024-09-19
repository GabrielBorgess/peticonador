'use client'

import React, { useState } from 'react'
import { Card, CardHeader, CardDescription, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const CreateCRCForm = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = async () => {

    const userData = {
      name,
      email,
      passwordHash: password
    }

    try{
      console.log("Criando user...")
      const res = await fetch('/api/admin/createCRC', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      console.log("Status da resposta:", res.status);
      const data = await res.json()

      if(res.ok){
        console.log("user criado com sucesso")
      } else {
        console.log(data.message)
      }
    } catch(err){
      console.log("Erro ao criar user")
      console.log(err)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>Crie um novo CRC user</CardTitle>
        <CardDescription>Preencha as informações abaixo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4"
          onSubmit={handleSubmit}
        >
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name"
              value={name}
              onChange={(e)=>{setName(e.target.value)}}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email"
            value={email}
            onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input id="password" type="password" 
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>
          <Button onClick={handleSubmit} type="submit" className="w-full">
            Criar
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        {/* {submitError && (
          <Alert variant="destructive">
            <AlertDescription>{submitError}</AlertDescription>
          </Alert>
        )}
        {submitSuccess && (
          <Alert>
            <AlertDescription>User created successfully!</AlertDescription>
          </Alert>
        )} */}
      </CardFooter>
    </Card>
  )
}

export default CreateCRCForm